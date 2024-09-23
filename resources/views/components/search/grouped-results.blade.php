@props([
    'groupTitle',
    'results',
])
@php
    $hasSearchItemTree = $this->getConfigs()->hasSearchItemTree();
    $isMustHighlightQueryMatches = $this->getConfigs()->isMustHighlightQueryMatches();
    $hasExpandedUrlTarget = $this->getConfigs()->hasExpandedUrlTarget()

@endphp
<li
    {{ $attributes->class(['fi-global-search-modal-result-group']) }}
>
    <div
        class="top-0 z-10"
    >
        <h3
            class="px-4 relative flex flex-1 flex-col justify-center overflow-x-hidden text-ellipsis whitespace-nowrap py-2 text-[0.9em] text-start font-semibold capitalize text-gray-950  dark:text-white"
        >
            {{ $groupTitle }}
        </h3>
    </div>

    <ul 
        @class([
            'list-result'
        ]) 
    >
        @foreach ($results as $result)
        
            <x-global-search-modal::search.result-item
                :actions="$result->actions"
                :details="$result->details"
                :title="$isMustHighlightQueryMatches ? $result->highlightedTitle : $result->title"
                :rawTitle="$result->title"
                :group="$groupTitle"
                :url="$result->url"
                :isLast="$loop->last"
                :hasSearchItemTree="$hasSearchItemTree"
                :hasExpandedUrlTarget="$hasExpandedUrlTarget"
            />
        @endforeach
    </ul>
</li>
