const localStorageKeyName = "tagList";
type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicared";
  save: () => void;
};
const tagLIstModel: TagListModel = {
  data: [],
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
  },
  create(name: string) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return "duplicared";
    }
    this.data.push({ id: name, name: name });
    this.save();
    return "success";
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagLIstModel;
