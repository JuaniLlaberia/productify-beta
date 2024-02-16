import { toast } from 'sonner';

export const copyToClipboard = async (
  stringToCopy: string,
  successMsg?: string,
  errorMsg?: string
) => {
  try {
    await navigator.clipboard.writeText(stringToCopy);
    toast.success(successMsg);
  } catch (err) {
    toast.error(errorMsg);
  }
};
