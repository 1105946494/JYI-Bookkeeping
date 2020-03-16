const localStorageKeyName = "recordlist";
const model = {
  clone(data: Recorditem[] | Recorditem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    return JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as Recorditem[];
  },
  save(data: Recorditem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};

export default model;
