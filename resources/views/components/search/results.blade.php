@props([
    'results',
])

@php
    $NotFoundView=$this->getConfigs()->getNotFoundView();
@endphp

<div

    {{
        $attributes->class([
            'fi-global-search-modal-results-ctn flex-1 z-10 w-full mt-1 overflow-y-auto h-full bg-white shadow-lg transition dark:bg-transparent ',
            '[transform:translateZ(0)]',
        ])
    }}
>
    @if ($results->getCategories()->isEmpty())
        @unless (filled($NotFoundView))
            <x-global-search-modal::search.no-results/>
        @else
            {!! $NotFoundView->render() !!}
        @endunless
    @else
        <ul 
        x-ref="group"
        >
            @foreach ($results->getCategories() as $groupTitle => $groupedResults)
                <x-global-search-modal::search.grouped-results
                    :groupTitle="$groupTitle"
                    :results="$groupedResults"
                />
            @endforeach
        </ul>
    @endif
</div>
