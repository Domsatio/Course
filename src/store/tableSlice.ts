import { create } from "zustand";

type VisibleColumnsProps = {
  isVisible: boolean;
  label: string;
};

interface CounterState {
  selectedId: string;
  visibleColumns: { [key: string]: VisibleColumnsProps };
  setSelectedId: (value: string) => void;
  setListVisibleColumns: (value: { [key: string]: VisibleColumnsProps }) => void;
}

const useTableStore = create<CounterState>((set) => ({
  selectedId: "",
  visibleColumns: {
    "No.": { isVisible: true, label: "No." },
    Title: { isVisible: true, label: "Title" },
    Description: { isVisible: true, label: "Description" },
    Status: { isVisible: true, label: "Status" },
    Actions: { isVisible: true, label: "Actions" },
  },
  service: null,
  setSelectedId: (value: string) =>
    set((state) => {
      return {
        selectedId: value,
      };
    }),
  setListVisibleColumns: (value: { [key: string]: VisibleColumnsProps }) =>
    set((state) => {
      return {
        visibleColumns: { ...value },
      };
    }),
}));

export default useTableStore;
