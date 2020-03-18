import tagLIstModel from "@/models/tagLIstModel";
import recordlist from "@/models/recordlist";

const store = {
  //record store
  recordList: recordlist.fetch(),
  createRecord: (record: RecordItem) => recordlist.create(record),

  //tag store
  tagList: tagLIstModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagLIstModel.create(name);
    if (message === "duplicated") {
      window.alert("标签名重复");
    } else if (message === "success") {
      return;
    }
  },
  removeTag: (id: string) => {
    if (tagLIstModel.remove(id)) {
      return true;
    } else {
      return false;
    }
  },
  updateTag: (id: string, name: string) => {
    return tagLIstModel.update(id, name);
  }
};
export default store;
