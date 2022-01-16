export const formatAccount = (addr: string) => {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(addr.length - 4);
};
