import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
    onConfirmAction: () => void | Promise<void>;
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export function ConfirmDeleteDialog({
    onConfirmAction,
    children,
    title = "Delete Invoice",
    description = "Are you sure you want to delete this invoice? This action cannot be undone.",
}: ConfirmDeleteDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={onConfirmAction}>
                        <AlertDialogAction asChild>
                            <Button variant="destructive" size="sm" type="submit">
                                Delete
                            </Button>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
