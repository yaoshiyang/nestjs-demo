import * as fs from 'fs';
import * as path from 'path';

const isPod = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) throw new Error();

  const filePath = isPod ? prodEnv : localEnv;
  return { path: filePath };
}

export default parseEnv();
