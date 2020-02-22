import * as fs from 'fs';

export function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const onFileRead = (err: Error, data: string) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    };

    fs.readFile(path, { encoding: 'utf8' }, onFileRead);
  });
}

export function readFileAsObject(path): Promise<object> {
  return readFile(path)
    .then((data: string) => {
      const obj = JSON.parse(data);

      if (!obj) {
        throw new Error('Object is empty');
      }

      return obj;
    });
}