<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
use Illuminate\Support\HtmlString;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Blade;

// use function CharrafiMed\GlobalSearchModal\format_styles;

trait CanUseCustomViews
{
    public  ?View $emptyQueryView = null;
    public  ?View $footerView = null;
    public  ?View $notFoundResultsView = null;


    public  function emptyQueryView($view): self
    {
        $this->emptyQueryView = $view;
        return $this;
    }
    public  function footerView($view): self
    {
        $this->footerView = $view;
        // dd($this->footerView);
        return $this;
    }
    public  function notFoundView($view): self
    {
        $this->notFoundResultsView = $view;
        return $this;
    }
    public  function getEmptyQueryView()
    {
        return $this->emptyQueryView;
    }
    public  function getFooterView()
    {
        return $this->footerView;
    }
    public  function getNotFoundView()
    {
        return $this->notFoundResultsView;
    }
}
