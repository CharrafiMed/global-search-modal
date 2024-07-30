@props([
    'type' => 'button',
    'icon' => null,
    'title' => null, // this is just the native button's title (for accessibilty)
    'clickFunction' => null,
])

<button type="{{ $type }}" title="{{ $title }}" x-on:click.stop="{{ $clickFunction }}"
    {{ 
    $attributes->merge(['class' => 'rounded-full cursor-pointer appearance-none dark:hover:bg-gray-800 p-2 hover:bg-gray-200 ']) 
}}>
    @switch ($icon)
        @case('x')
            <x-global-search-modal::icon.x />
        @break

        @case('favorite')
            <x-global-search-modal::icon.favorite />
        @break
    @endswitch
    {{-- todo : refactor to dynamic components cz at this time does not seems to work and i don't know way --}}
</button>
