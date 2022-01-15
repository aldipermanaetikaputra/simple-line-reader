import { unlinkSync, writeFileSync } from "fs";
import LineReader from "./";

const getRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

describe("Count with empty lines in multiple mode", () => {
  const path = "test.txt";
  const total = 0;

  beforeAll(() => {
    writeFileSync(path, "");
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }
    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }
    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }
    expect(receiveds.length).toBe(total);
  });
});

describe("Count with single lines in multiple mode", () => {
  const path = "test.txt";
  const total = 230;
  const content = Array(total)
    .fill(null)
    .map((_) => "_".repeat(getRandomNumber(20, 40)))
    .join("");

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.join("")).toBe(content);
    expect(receiveds.length).toBe(1);
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.join("")).toBe(content);
    expect(receiveds.length).toBe(1);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.join("")).toBe(content);
    expect(receiveds.length).toBe(1);
  });
});

describe("Count with compact lines in multiple mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const total = 1207;
  const content = Array(total)
    .fill(null)
    .map((_) => "_".repeat(getRandomNumber(20, 40)))
    .join(separator);

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.join(separator)).toBe(content);
    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.join(separator)).toBe(content);
    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.join(separator)).toBe(content);
    expect(receiveds.length).toBe(total);
  });
});

describe("Count with new line padding in multiple mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const total = 1207;
  const content =
    separator +
    Array(total)
      .fill(null)
      .map((_) => "_".repeat(getRandomNumber(20, 40)))
      .join(separator) +
    separator;

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(total + 2);
    expect(receiveds.join(separator)).toBe(content);
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(total + 2);
    expect(receiveds.join(separator)).toBe(content);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(total + 2);
    expect(receiveds.join(separator)).toBe(content);
  });
});

describe("Count with new line padding [ignore empty lines] in multiple mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const total = 1207;
  const content =
    separator +
    Array(total)
      .fill(null)
      .map((_) => "_".repeat(getRandomNumber(20, 40)))
      .join(separator) +
    separator;

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(total);
    expect(receiveds.join(separator)).toBe(content.trim());
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(total);
    expect(receiveds.join(separator)).toBe(content.trim());
  });
});

describe("Count with new line at middle in multiple mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const totals = new Array(getRandomNumber(3, 6))
    .fill(null)
    .map(() => [getRandomNumber(100, 1000), getRandomNumber(1, 3)]);
  const content = totals
    .map(
      ([a, b]) =>
        new Array(a)
          .fill(null)
          .map(() => "_".repeat(getRandomNumber(20, 40)))
          .join(separator) + separator.repeat(b)
    )
    .join(separator);

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + (a + b), 0));
    expect(receiveds).toEqual(content.split(separator));
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + (a + b), 0));
    expect(receiveds).toEqual(content.split(separator));
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + (a + b), 0));
    expect(receiveds).toEqual(content.split(separator));
  });
});

describe("Count with new line at middle [ignore empty lines] in multiple mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const totals = new Array(getRandomNumber(3, 6))
    .fill(null)
    .map(() => [getRandomNumber(100, 1000), getRandomNumber(1, 3)]);
  const content = totals
    .map(
      ([a, b]) =>
        new Array(a)
          .fill(null)
          .map(() => "_".repeat(getRandomNumber(20, 40)))
          .join(separator) + separator.repeat(b)
    )
    .join(separator);

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + a, 0));
    expect(receiveds).toEqual(
      content
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean)
    );
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + a, 0));
    expect(receiveds).toEqual(
      content
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean)
    );
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const lines = reader.next();
      receiveds.push(...lines);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + a, 0));
    expect(receiveds).toEqual(
      content
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean)
    );
  });
});

describe("Count with empty lines in single mode", () => {
  const path = "test.txt";
  const total = 0;

  beforeAll(() => {
    writeFileSync(path, "");
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }
    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }
    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }
    expect(receiveds.length).toBe(total);
  });
});

describe("Count with single lines in single mode", () => {
  const path = "test.txt";
  const total = 230;
  const content = Array(total)
    .fill(null)
    .map((_) => "_".repeat(getRandomNumber(20, 40)))
    .join("");

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.join("")).toBe(content);
    expect(receiveds.length).toBe(1);
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.join("")).toBe(content);
    expect(receiveds.length).toBe(1);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.join("")).toBe(content);
    expect(receiveds.length).toBe(1);
  });
});

describe("Count with compact lines in single mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const total = 1207;
  const content = Array(total)
    .fill(null)
    .map((_) => "_".repeat(getRandomNumber(20, 40)))
    .join(separator);

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.join(separator)).toBe(content);
    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.join(separator)).toBe(content);
    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.join(separator)).toBe(content);
    expect(receiveds.length).toBe(total);
  });
});

describe("Count with new line padding in single mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const total = 1207;
  const content =
    separator +
    Array(total)
      .fill(null)
      .map((_) => "_".repeat(getRandomNumber(20, 40)))
      .join(separator) +
    separator;

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(total + 2);
    expect(receiveds.join(separator)).toBe(content);
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(total + 2);
    expect(receiveds.join(separator)).toBe(content);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(total + 2);
    expect(receiveds.join(separator)).toBe(content);
  });
});

describe("Count with new line padding [ignore empty lines] in single mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const total = 1207;
  const content =
    separator +
    Array(total)
      .fill(null)
      .map((_) => "_".repeat(getRandomNumber(20, 40)))
      .join(separator) +
    separator;

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(total);
    expect(receiveds.join(separator)).toBe(content.trim());
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(total);
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(total);
    expect(receiveds.join(separator)).toBe(content.trim());
  });
});

describe("Count with new line at middle in single mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const totals = new Array(getRandomNumber(3, 6))
    .fill(null)
    .map(() => [getRandomNumber(100, 1000), getRandomNumber(1, 3)]);
  const content = totals
    .map(
      ([a, b]) =>
        new Array(a)
          .fill(null)
          .map(() => "_".repeat(getRandomNumber(20, 40)))
          .join(separator) + separator.repeat(b)
    )
    .join(separator);

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + (a + b), 0));
    expect(receiveds).toEqual(content.split(separator));
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + (a + b), 0));
    expect(receiveds).toEqual(content.split(separator));
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + (a + b), 0));
    expect(receiveds).toEqual(content.split(separator));
  });
});

describe("Count with new line at middle [ignore empty lines] in single mode", () => {
  const path = "test.txt";
  const separator = "\r\n";
  const totals = new Array(getRandomNumber(3, 6))
    .fill(null)
    .map(() => [getRandomNumber(100, 1000), getRandomNumber(1, 3)]);
  const content = totals
    .map(
      ([a, b]) =>
        new Array(a)
          .fill(null)
          .map(() => "_".repeat(getRandomNumber(20, 40)))
          .join(separator) + separator.repeat(b)
    )
    .join(separator);

  beforeAll(() => {
    writeFileSync(path, content);
  });

  afterAll(() => unlinkSync(path));

  it("should be return correct line total with high buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(50000, 150000),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + a, 0));
    expect(receiveds).toEqual(
      content
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean)
    );
  });

  it("should be return correct line total with low buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(5, 10),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + a, 0));
    expect(receiveds).toEqual(
      content
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean)
    );
  });

  it("should be return correct line total with medium buffer", () => {
    const reader = new LineReader({
      filePath: path,
      skipBlank: true,
      bufferSize: getRandomNumber(20, 50),
    });
    const receiveds = [];

    expect(reader.isDone).toBe(false);

    while (!reader.isDone) {
      const line = reader.nextSingle();
      if (line !== undefined) receiveds.push(line);
    }

    expect(receiveds.length).toBe(totals.reduce((p, [a, b]) => p + a, 0));
    expect(receiveds).toEqual(
      content
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean)
    );
  });
});
