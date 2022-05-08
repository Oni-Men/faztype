//https://qiita.com/coa00/items/679b0b5c7c468698d53f
export function createID(): string  {
  return (
    new Date().getTime().toString(16) +
    Math.floor(1024 * Math.random()).toString(16)
  );
}