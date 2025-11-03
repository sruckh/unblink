import { Switch } from "solid-js";
import LayoutContent from "./LayoutContent";
import ArkSwitch from "./ark/ArkSwitch";

export default function SettingsContent() {
    return <LayoutContent title="Settings">
        <div class="p-4">
            <div class="bg-neu-850 border border-neu-800 rounded-lg p-6">
                <div class="flex items-center justify-between">
                    <ArkSwitch
                        checked={() => true}
                        onCheckedChange={(details) => { }}
                        label="Enable Object Detection"
                    />
                </div>

            </div>
        </div>
    </LayoutContent>
}