@props([
    'type' => 'button',
    'icon' => null,
    'title' => null, // just for accessibilty
])


<button 
    data-action
    type="{{ $type }}" 
    title="{{ $title }}"
    tabindex="1"
    {{ $attributes->merge(['class' => 'hover:bg-black/5 rounded-full cursor-pointer p-2 dark:hover:bg-white/10 duration transition relative cursor-pointer focus-visible:outline-none  focus:bg-gray-100 dark:focus:bg-white/10 border focus:border-gray-400 dark:focus:border-white/30 appearance-none rounded-full border-none bg-none p-1.5 text-gray-400 text-inherit dark:hover:bg-white/5 hover:bg-gray-800/5']) }}
>
    <x-filament::icon :icon="$icon"/>
</button>
