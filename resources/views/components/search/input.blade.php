@props([
   'placeholder' => 'Search for anything ...',
   'maxlength' => 64
])
@php
    $classes = [
        // base input styling 
        'block w-full border-none bg-transparent',
        
        // padding and text sizing - because size matters (in UI) 📏
        'pt-1.5 pb-2 text-base sm:text-sm sm:leading-6',
        
        // light mode colors 
        'text-gray-950 placeholder:text-gray-400',
        
        // dark mode colors 
        'dark:text-white dark:placeholder:text-gray-500',
        
        // focus states 
        'focus:ring-0 transition duration-75',
        
        // disabled states (light mode) - when inputs go to sleep 😴
        'disabled:text-gray-500 disabled:[-webkit-text-fill-color:var(--color-gray-500)]',
        'disabled:placeholder:[-webkit-text-fill-color:var(--color-gray-400)]',
        
        // disabled states (dark mode) - sleepy dark mode edition 🌚
        'dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:var(--color-gray-400)]',
        'dark:disabled:placeholder:[-webkit-text-fill-color:var(--color-gray-500)]',
    ];
@endphp
<input
   id="search-input"
   type="search"
   aria-autocomplete="both"
   aria-labelledby="search-label"
   aria-activedescendant="search-item-0"
   aria-controls="search-list"
   
   style="border:none; outline:none"
   
   x-on:keydown.down.prevent.stop="$dispatch('focus-first-element')"
   wire:model.live.debounce.200ms="search"
   x-on:keydown.enter.prevent 
   
   autocomplete="off"
   autocorrect="off"
   x-data="{}"
   autocapitalize="none"
   enterkeyhint="go"
   spellcheck="false"
   placeholder="{{__( $placeholder) }}"
   autofocus="true"
   maxlength="{{ $maxlength }}"
   class="{{ $attributes->class(Arr::toCssClasses($classes)) }}"
/>
