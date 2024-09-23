@props([
   'placeholder'=>'Search for anything ...'
])
<input
    id="search-input"
    type="search"
    aria-autocomplete="both"
    aria-labelledby="search-label"
    aria-activedescendant="search-item-0"
    aria-controls="search-list"
    style="border:none; outline:none"
    wire:model.live.debounce.200ms="search"
    autocomplete="off"
    autocorrect="off"
    x-data="{}"
    x-on:keydown.down.prevent.stop="$dispatch('focus-first-element')"
    autocapitalize="none"
    enterkeyhint="go"
    spellcheck="false"
    placeholder="{{__( $placeholder) }}"
    autofocus="true"
    maxlength="64"
    @class([
      'fi-input block w-full border-none bg-transparent py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.400)] dark:text-white dark:placeholder:text-gray-500 dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] dark:disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.500)] sm:text-sm sm:leading-6',
   ])
/>
