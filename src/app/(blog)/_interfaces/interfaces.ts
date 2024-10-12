export interface SubCategory {
    id: number;
    title: string;
}

export interface BoardCategory {
    id: number;
    title: string;
    subCategories?: SubCategory[];
}

export interface DeleteConfirmDialogProps {
    message: string;           
    warningMessage?: string;   
    onConfirm: () => void;   
    onCancel: () => void;
}