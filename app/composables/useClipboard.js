export const useClipboard = () => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    copyToClipboard
  };
};
