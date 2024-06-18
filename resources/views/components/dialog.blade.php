<div x-data="{}">

    <div class="flex justify-center" x-ignore ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('global-search-modal', 'charrafimed/global-search-modal') }}"
        x-data="modal">
        <!-- Modal -->
        <div class="fixed inset-0 z-40 overflow-y-auto" role="dialog" aria-modal="true" style="display: none"
            x-show="$store.modalStore.open" x-on:keydown.escape.prevent.stop="$store.modalStore.hideModal()"
            x-id="['modal-title']" :aria-labelledby="$id('modal-title')">
            <!-- Overlay -->
            <div class="fixed inset-0 bg-black bg-opacity-50" x-show="$store.modalStore.open" x-transition.opacity>
            </div>

            <!-- Panel -->
            <div class="relative flex min-h-screen items-center justify-center p-4" x-show="$store.modalStore.open"
                x-transition x-on:click="$store.modalStore.hideModal()">
                <div class="relative w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-12 shadow-lg"
                    x-on:click.stop x-trap.noscroll.inert="$store.modalStore.open">
                    <!-- Title -->
                    <h2 class="text-3xl font-bold" :id="$id('modal-title')">Confirm</h2>

                    <!-- Content -->
                    <p class="mt-2 text-gray-600">Are you sure you want to learn how to create an awesome modal?</p>

                    <!-- Buttons -->
                    <div class="mt-8 flex space-x-2">
                        <button class="rounded-md border border-gray-200 bg-white px-5 py-2.5" type="button"
                            x-on:click="$store.modalStore.open = false">
                            Confirm
                        </button>

                        <button class="rounded-md border border-gray-200 bg-white px-5 py-2.5" type="button"
                            x-on:click="$store.modalStore.open = false">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener('alpine:init', () => {
        Alpine.store('modalStore', {
            open: false,
            showModal() {
                this.open = true;
            },
            hideModal() {
                this.open = false;
                const input = document.querySelector('.fi-global-search-field');
                if (input) {
                    input.style.display = 'block';
                }
            }
        });
    })
</script>
