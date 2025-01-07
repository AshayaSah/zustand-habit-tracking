import { Search } from "@mui/icons-material";
import { create } from "zustand";

export const useAppStore = create((set) => ({
  personalInfo: JSON.parse(localStorage.getItem("personalInfo")) || [],
  filteredPersonalInfo: [],
  filteredSeaerchPersonalInfo: [],

  currentEdit: null,

  addPersonalInfo: (info) =>
    set((state) => {
      const updatedData = [...state.personalInfo, info];
      localStorage.setItem("personalInfo", JSON.stringify(updatedData));
      return { personalInfo: updatedData };
    }),

  updatePersonalInfo: (updatedInfo) =>
    set((state) => {
      const updatedData = state.personalInfo.map((entry) =>
        entry.id === updatedInfo.id ? updatedInfo : entry
      );
      localStorage.setItem("personalInfo", JSON.stringify(updatedData));
      return { personalInfo: updatedData };
    }),

  filterPersonalInfo: (docstatus) =>
    set((state) => {
      const filteredData = state.personalInfo.filter((info) =>
        docstatus == "all" ? info : info.docstatus == docstatus
      );
      return { filteredPersonalInfo: filteredData };
    }),

  filterSearchPersonalInfo: (searchTerm, docstatus) =>
    set((state) => {
      const filteredSearchData =
        (docstatus == "all" || docstatus == "") && searchTerm == ""
          ? state.personalInfo.filter(
              (info) =>
                info.name.includes(searchTerm) ||
                info.email.includes(searchTerm)
            )
          : docstatus == "0"
          ? state.personalInfo.filter(
              (info) =>
                (info.name.includes(searchTerm) ||
                  info.email.includes(searchTerm)) &&
                info.docstatus == "0"
            )
          : docstatus == "1"
          ? state.personalInfo.filter(
              (info) =>
                (info.name.includes(searchTerm) ||
                  info.email.includes(searchTerm)) &&
                info.docstatus == "1"
            )
          : docstatus == "2"
          ? state.personalInfo.filter(
              (info) =>
                (info.name.includes(searchTerm) ||
                  info.email.includes(searchTerm)) &&
                info.docstatus == "2"
            )
          : state.personalInfo.filter(
              (info) =>
                info.name.includes(searchTerm) ||
                info.email.includes(searchTerm)
            );
      return { filteredSeaerchPersonalInfo: filteredSearchData };
    }),

  setCurrentEdit: (info) => set({ currentEdit: info }),

  clearCurrentEdit: () => set({ currentEdit: null }),
}));

export default useAppStore;
