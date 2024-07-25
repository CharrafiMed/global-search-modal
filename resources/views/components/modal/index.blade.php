@props([
    'header'=>null,
    'footer'=>null
])

@use('Filament\Support\Facades\FilamentAsset')
@use('Filament\Support\Enums\MaxWidth')
@php
    $debounce = filament()->getGlobalSearchDebounce();
    $keyBindings = filament()->getGlobalSearchKeyBindings();
    $suffix = filament()->getGlobalSearchFieldSuffix();
    $isClosedByClickingAway = $this->getConfigs()->isClosedByClickingAway();
    $isClosedByEscaping = $this->getConfigs()->isClosedByEscaping();

    $isSlideOver = $this->getConfigs()->isSlideOver();
    $maxWidth=$this->getConfigs()->getMaxWidth();
    $position = $this->getConfigs()->getPosition();
    $top = $position?->getTop() ?: ($isSlideOver ? '0px' : '100px');
    $left = $position?->getLeft() ?? '0';
    $right = $position?->getRight() ?? '0';
    $bottom = $position?->getBottom() ?? '0';
@endphp

<div 
    @class(['flex justify-center']) 
    x-ignore 
    ax-load
    ax-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-observer', 'charrafimed/global-search-modal') }}"
    x-data="observer"
    >
    <div 
        class="fixed inset-0 z-40 overflow-y-hidden" 
        role="dialog" 
        aria-modal="true" 
        style="display: none"
        x-show="$store.modalStore.open"
        @if ($isClosedByEscaping)
             x-on:keydown.escape.window="$store.modalStore.hideModal()" 
        @endif
        x-id="['modal-title']" 
        x-bind:aria-labelledby="$id('modal-title')">

        <!-- Overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg" x-show="$store.modalStore.open" x-transition.opacity>
        </div>

        <!-- Panel -->
        <div class="">
            <div 
                class="relative  flex min-h-screen items-center justify-center p-4" 
                x-show="$store.modalStore.open"
                x-transition 
                
                @if ($isClosedByClickingAway) 
                    x-on:click="$store.modalStore.hideModal()" 
                @endif
                >
                <div
                    @if (blank($position))
                        @style([
                                "top: 100px;" => !$isSlideOver,
                                "top: 0;" => $isSlideOver
                            ])
                    @else
                        style="
                            top: {{ $top }};
                            left: {{ $left }};
                            right: {{ $right }};
                            bottom: {{ $bottom }};
                            "
                    @endif
                    @class([
                    'absolute  py-1 px-0.5 shadow-lg bg-green-500',
                    'inset-y-0 overflow-y-auto  rounded-l-2xl right-0 max-w-sm w-full sm:w-1/2' => $isSlideOver,
                    'inset-x-0 w-full rounded-xl mx-auto' => !$isSlideOver,
                        match ($maxWidth) {
                            MaxWidth::ExtraSmall => 'max-w-xs',
                            MaxWidth::Small => 'max-w-sm',
                            MaxWidth::Medium => 'max-w-md',
                            MaxWidth::Large => 'max-w-lg',
                            MaxWidth::ExtraLarge => 'max-w-xl',
                            MaxWidth::TwoExtraLarge => 'max-w-2xl',
                            MaxWidth::ThreeExtraLarge => 'max-w-3xl',
                            MaxWidth::FourExtraLarge => 'max-w-4xl',
                            MaxWidth::FiveExtraLarge => 'max-w-5xl',
                            MaxWidth::SixExtraLarge => 'max-w-6xl',
                            MaxWidth::SevenExtraLarge => 'max-w-7xl',
                            MaxWidth::Full => 'max-w-full',
                            MaxWidth::MinContent => 'max-w-min',
                            MaxWidth::MaxContent => 'max-w-max',
                            MaxWidth::FitContent => 'max-w-fit',
                            MaxWidth::Prose => 'max-w-prose',
                            MaxWidth::ScreenSmall => 'max-w-screen-sm',
                            MaxWidth::ScreenMedium => 'max-w-screen-md',
                            MaxWidth::ScreenLarge => 'max-w-screen-lg',
                            MaxWidth::ScreenExtraLarge => 'max-w-screen-xl',
                            MaxWidth::ScreenTwoExtraLarge => 'max-w-screen-2xl',
                            MaxWidth::Screen => 'fixed inset-0',
                            default => $maxWidth,
                        },
                    ]) 
                    x-on:click.stop
                    x-trap.noscroll.inert="$store.modalStore.open"
                    >
                    <div class="w-full overflow-y-auto rounded-xl px-2 py-1 text-center shadow-lg">
                        <!-- Content -->
                        @if (filled($header))
                            <header class="flex items-center border-b border-slate-700 px-2">
                                {{ $header }}
                            </header>
                        @endif
                        <div class="max-h-[50vh] overflow-auto text-white">
                            {{ $slot }}
                        </div>
                    </div>
                    @if (filled($footer))
                        <footer
                            class="relative z-30 flex w-full select-none items-center px-2 py-2 text-center dark:border-slate-700">
                            {{ $footer }}
                        </footer>            
                    @endif
         
                </div>
            </div>
        </div>
    </div>
</div>
