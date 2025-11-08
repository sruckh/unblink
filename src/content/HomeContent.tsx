import { format } from 'date-fns';
import { For, onMount, Show } from 'solid-js';
import DeleteCameraButton from '~/src/DeleteCameraButton';
import EditCameraButton from '~/src/EditCameraButton';
import { authorized_as_admin, cameras, camerasLoading, fetchCameras } from '~/src/shared';
import LayoutContent from "./LayoutContent";

export default function HomeContent() {
    onMount(fetchCameras);

    return <LayoutContent title="Home">
        <div class="">
            <div class="relative overflow-x-auto ">
                <table class="w-full text-sm text-left text-neu-400">
                    <thead class="text-neu-400 font-normal">
                        <tr class="">
                            <th scope="col" class="px-6 py-3 font-medium">
                                Camera Name
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                URI
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Labels
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Updated At
                            </th>
                            <Show when={authorized_as_admin()}>
                                <th scope="col" class="px-6 py-3 font-medium">
                                    Actions
                                </th>
                            </Show>
                        </tr>
                    </thead>
                    <tbody>
                        <Show when={!camerasLoading()} fallback={
                            <tr>
                                <td colspan="5" class="text-center p-4">Loading...</td>
                            </tr>
                        }>
                            <Show when={cameras().length > 0} fallback={
                                <tr>
                                    <td colspan="5" class="text-center p-4">No cameras found. Add one to get started.</td>
                                </tr>
                            }>
                                <For each={cameras()}>
                                    {(camera) => (
                                        <tr class="border-b bg-neu-900 border-neu-800">
                                            <td class="px-6 py-4 font-medium text-white">
                                                {camera.name}
                                            </td>
                                            <td class="px-6 py-4 max-w-[20vw]">
                                                <span class="line-clamp-1 break-all">{camera.uri}</span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex flex-wrap gap-1">
                                                    <For each={camera.labels}>
                                                        {(label) => (
                                                            <span class="bg-neu-700 text-neu-300 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
                                                                {label}
                                                            </span>
                                                        )}
                                                    </For>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {format(camera.updated_at, 'PPpp')}
                                            </td>
                                            <Show when={authorized_as_admin()}>
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center gap-2">
                                                        <EditCameraButton camera={camera}>
                                                            Edit
                                                        </EditCameraButton>
                                                        <DeleteCameraButton camera={camera}>
                                                            Delete
                                                        </DeleteCameraButton>
                                                    </div>
                                                </td>
                                            </Show>
                                        </tr>
                                    )}
                                </For>
                            </Show>
                        </Show>
                    </tbody>
                </table>
            </div>
        </div>
    </LayoutContent>
}