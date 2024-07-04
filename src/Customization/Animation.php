<?php
namespace CharrafiMed\GlobalSearchModal\Customization;

use Closure;


class Animation
{
    protected $modalOverlay;
    protected $modalPanel;
    protected $enterStart;
    protected $enterEnd;
    protected $leaveEnter;
    protected $leaveStart;

    public function modalOverlay(Closure $callback): self
    {
        $animation = new self();
        $callback($animation);
        $this->modalOverlay = $animation;
        return $this;
    }

    public function modalPanel(Closure $callback): self
    {
        $animation = new self();
        $callback($animation);
        $this->modalPanel = $animation;
        return $this;
    }

    public function enterStart(string $value): self
    {
        $this->enterStart = $value;
        return $this;
    }

    public function enterEnd(string $value): self
    {
        $this->enterEnd = $value;
        return $this;
    }

    public function leaveEnter(string $value): self
    {
        $this->leaveEnter = $value;
        return $this;
    }

    public function leaveStart(string $value): self
    {
        $this->leaveStart = $value;
        return $this;
    }
}