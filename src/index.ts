import ChunkReader from "simple-chunk-reader";

interface LineReaderOptions {
  filePath: string;
  bufferSize?: number;
  skipBlank?: boolean;
}

class LineReader {
  static NEW_LINE_SEPARATOR = "\n";
  static REMOVED_STRING = "\r";

  private options: LineReaderOptions;
  private reader: ChunkReader;
  private cutted?: string;
  private lines: string[];

  public get isDone() {
    return this.reader.isDone && this.cutted === undefined;
  }

  public get bytesLength() {
    return this.reader.bytesLength;
  }

  constructor(options: LineReaderOptions) {
    this.options = options;
    this.reader = new ChunkReader(
      this.options.filePath,
      this.options.bufferSize
    );
    this.lines = [];
  }

  public toLines(data?: string, prepend?: string[]) {
    if (!data) data = "";

    let lines = data
      .replace(new RegExp(LineReader.REMOVED_STRING, "g"), "")
      .split(LineReader.NEW_LINE_SEPARATOR);

    if (this.options.skipBlank) {
      lines = lines.filter((line) => line.trim().length);
    }

    if (prepend) {
      lines = [...prepend, ...lines];
    }

    return lines;
  }

  public nextChunk() {
    if (this.reader.isDone) {
      const cutted = this.cutted;
      this.cutted = undefined;
      return cutted;
    }

    let chunks = "";
    let cutAt = 0;
    let cutted = false;

    while (!this.reader.isDone) {
      const chunk = this.reader.read();
      const foundAt = chunk.lastIndexOf(LineReader.NEW_LINE_SEPARATOR);

      chunks += chunk;
      if (foundAt !== -1) {
        cutAt = chunks.length - chunk.length + foundAt;
        cutted = true;
        break;
      }
    }

    const data =
      (this.cutted || "") + (cutted ? chunks.slice(0, cutAt) : chunks);
    this.cutted = cutted ? chunks.slice(cutAt + 1) : undefined;

    return data;
  }

  public next() {
    const output = this.nextChunk();

    if (this.reader.bytesLength === 0) return [];

    const lines = this.toLines(output, this.lines);
    this.lines = [];

    return lines;
  }

  public nextSingle() {
    if (this.lines.length === 0) {
      this.lines = this.next();
    }

    return this.lines.shift();
  }

  public close() {
    this.reader.close();
  }
}

export = LineReader;
