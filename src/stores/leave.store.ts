import { create } from "zustand";

interface LeaveStore {}

const useLeaveStore = create<LeaveStore>((set) => ({
  // Define your store state and actions here
}));

export default useLeaveStore;
