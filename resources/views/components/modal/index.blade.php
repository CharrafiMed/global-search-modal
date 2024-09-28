@props([
    'header'=>null,
    'footer'=>null
])

@use('Filament\Support\Facades\FilamentAsset')
@use('Filament\Support\Enums\MaxWidth')

@php
    $isClosedByClickingAway = $this->getConfigs()->isClosedByClickingAway();
    $isClosedByEscaping = $this->getConfigs()->isClosedByEscaping();
    $hasCloseButton=$this->getConfigs()->hasCloseButton();
    $isSwappableOnMobile= $this->getConfigs()->isSwappableOnMobile();
    $isSlideOver = $this->getConfigs()->isSlideOver();
    $maxWidth=$this->getConfigs()->getMaxWidth();
    $position = $this->getConfigs()->getPosition();
    $top = $position?->getTop() ?: ($isSlideOver ? '0px' : '100px');
    $left = $position?->getLeft() ?? '0';
    $right = $position?->getRight() ?? '0';
    $bottom = $position?->getBottom() ?? '0';
@endphp

<div 
    @class(['flex justify-center ltr:text-left rtl:text-right']) 
>
    <div 
        @class([
            'fixed inset-0 z-40 overflow-y-hidden',
            'sm:pt-0'=> !$isSlideOver
        ]) 
        role="dialog" 
        aria-modal="true" 
        style="display: none"
        x-show="$store.globalSearchModalStore.isOpen"
        
        @if ($isClosedByEscaping)
             x-on:keydown.escape.window="$store.globalSearchModalStore.hideModal()" 
        @endif
        x-id="['modal-title']" 
        x-bind:aria-labelledby="$id('modal-title')">

        <!-- Overlay -->
        <div 
        @class([
          'global-search-modal-overlay fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg'
        ])
        x-show="$store.globalSearchModalStore.isOpen"
        x-transition.opacity
        
        >
        </div>

        <!-- Panel -->
        <div class="global-search-modal-panel">
            <div 
                class="relative flex min-h-screen items-center justify-center p-4" 
                x-show="$store.globalSearchModalStore.isOpen"
                x-transition 
                
                @if ($isClosedByClickingAway) 
                    x-on:click="$store.globalSearchModalStore.hideModal()" 
                @endif
                >
                <div
                    @if (blank($position))
                        @style([
                                "top: 100px;" => !$isSlideOver,
                                "top: 0;" => $isSlideOver,
                                "height:screen;"=>$isSlideOver
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
                        'absolute py-1 px-0.5 shadow-lg  dark:bg-gray-900  bg-white',
                        'inset-y-0 overflow-y-auto  rounded right-0 max-w-2xl w-full sm:w-1/2' => $isSlideOver,
                        'inset-x-0 w-full rounded-xl mx-auto mx-2' => !$isSlideOver,
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
                            default => "max-w-2xl",
                        },
                    ]) 
                    x-on:click.stop
                    x-trap.noscroll.inert="$store.globalSearchModalStore.isOpen"
                    >
                    <div
                        x-ignore
                        ax-load
                        ax-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-swappable', 'charrafimed/global-search-modal') }}"
                        x-data="swappable" @class([
                        ' overflow-y-auto  px-1 py-1 text-center shadow-sm',
                        'rounded-xl mx-2' => !$isSlideOver,
                        'h-[90vh]' => $isSlideOver
                        ])>
                    @if ($isSwappableOnMobile)
                        <div 
                            x-on:touchstart="handleMovingStart($event)"
                            x-on:touchmove="handleWhileMoving($event)"
                            x-on:touchend="handleMovingEnd()"                            
                            class="absolute sm:hidden top-[-10px] left-0 right-0 h-[50px]">
                            <div class="flex justify-center pt-[12px]">
                                <div class="bg-gray-400 rounded-full w-[10%] h-[5px]"></div>
                            </div>
                        </div>
                    @endif
                                                

                        <!-- Content -->
                        @if (filled($header))
                            <header class="global-search-modal-header flex sticky top-0 z-30  items-center border-b border-gray-100 dark:border-gray-700 px-2">
                                {{ $header }}
                            </header>
                        @endif
                        <div 
                            @class([
                                'global-search-modal-drop-down',
                                'overflow-auto text-white',
                                'max-h-[60vh]'=>!$isSlideOver,
                                'max-h-full'=>$isSlideOver
                            ])
                        >
                            {{ $dropdown }}
                        </div>
                    </div>
                    @if (filled($footer))
                        <footer
                            @class([
                                'global-search-modal-footer',
                                "z-30 hidden sm:flex  w-full select-none items-center px-2 py-2 text-center dark:border-gray-700",
                                'relative'=>!$isSlideOver,
                                'sticky bottom-2'=>$isSlideOver,
                                ])
                            >
                            {{ $footer }}
                        </footer>            
                    @endif
         
                </div>
            </div>
        </div>
    </div>
</div>
