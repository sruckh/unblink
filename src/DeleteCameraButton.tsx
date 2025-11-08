import { Dialog } from '@ark-ui/solid/dialog';
import { ArkDialog } from './ark/ArkDialog';
import { fetchCameras, type Camera } from './shared';
import { toaster } from './ark/ArkToast';

export default function DeleteCameraButton(props: { camera: Camera, children: any }) {
    const handleDelete = async () => {
        toaster.promise(async () => {
            const response = await fetch(`/media/${props.camera.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchCameras();
            } else {
                throw new Error('Failed to delete camera');
            }
        }, {
            loading: {
                title: 'Deleting...',
                description: 'Your camera is being deleted.',
            },
            success: {
                title: 'Success!',
                description: 'Camera has been deleted successfully.',
            },
            error: {
                title: 'Failed',
                description: 'There was an error deleting your camera. Please try again.',
            },
        });
    };

    return <ArkDialog
        trigger={(_, setOpen) => <button
            onClick={() => setOpen(true)}
            class="btn-primary">
            {props.children}
        </button>}
        title="Delete camera"
        description={`Are you sure you want to delete "${props.camera.name}"? This action cannot be undone.`}
    >
        <div class="flex justify-end pt-4">
            <Dialog.CloseTrigger>
                <button
                    onClick={handleDelete}
                    class="btn-danger">
                    Delete Camera
                </button>
            </Dialog.CloseTrigger>
        </div>
    </ArkDialog>
}
