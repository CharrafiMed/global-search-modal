@props([
    'title'=>null,
])
<div class="top-0 z-10">
    <h3
        class="relative flex flex-1 flex-col justify-center overflow-x-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-start text-[0.9em] font-semibold capitalize text-primary-600 dark:text-white   ">
        {{ $title }}
    </h3>
</div>