<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
use Filament\Support\Concerns\EvaluatesClosures;

trait CanCustomizeModal
{
    // use EvaluatesClosures;
    public static bool $hasCloseButton = true;

    public static bool $isClosedByClickingAway = true;

    public static bool $isClosedByEscaping = true;

    public static bool $isAutofocused = true;

    public static bool $isSlideOver = false;

    public static function autofocus(bool $condition = true): void
    {
        static::$isAutofocused = $condition;
    }
    public function isAutofocus(): bool
    {
        return static::$isAutofocused;
    }

    public static function closeButton(bool $condition = true): void
    {
        static::$hasCloseButton = $condition;
    }
    public  function hasCloseButton(): bool
    {
        return static::$hasCloseButton;
    }

    public static function closedByClickingAway(bool $condition = true): void
    {
        static::$isClosedByClickingAway = $condition;
    }
    public  function isClosedByClickingAway(): bool
    {
        return static::$isClosedByClickingAway;
    }

    public static function closedByEscaping(bool $condition = true): void
    {
        static::$isClosedByEscaping = $condition;
    }
    public  function isClosedByEscaping(): bool
    {
        return static::$isClosedByEscaping;
    }

    public static function slideOver(bool|Closure $condition = false)
    {
        static::$isSlideOver = $condition;
    }
    public function isSlideOver(): bool
    {
        return static::$isSlideOver;
    }
}
