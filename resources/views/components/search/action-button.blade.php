@props([
    'type' => 'button',
    'icon' => null,
    'title' => null, // this is just the native button's title (for accessibilty)
    'clickFunction' => null,
])

<button
    type="{{ $type }}"
    title="{{ __($title) }}"
    x-on:click.stop="{{ $clickFunction }}"
    class="action-button  hover:bg-black/5 rounded-full cursor-pointer p-2 dark:hover:bg-white/10 duration transition"
    >
    @switch ($icon)
        @case('x')
            <x-global-search-modal::icon.x />
        @break

        @case('favorite')
            <x-global-search-modal::icon.favorite />
        @break
    @endswitch
    {{-- todo :
        refactor to dynamic components cz at this time does not seems to work and i don't know way
     --}}
</button>
