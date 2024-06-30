<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Filament\Support\Concerns\EvaluatesClosures;

trait CanCustomizeModal
{
    use EvaluatesClosures;
    public static bool $hasCloseButton = true;

    public static bool $isClosedByClickingAway = true;

    public static bool $isClosedByEscaping = true;

    public static bool $isAutofocused = true;

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
    public static function hasCloseButton(): bool
    {
        return static::$hasCloseButton;
    }

    public static function closedByClickingAway(bool $condition = true): void
    {
        static::$isClosedByClickingAway = $condition;
    }
    public static function isClosedByClickingAway(): bool
    {
        return static::$isClosedByClickingAway;
    }

    public static function closedByEscaping(bool $condition = true): void
    {
        static::$isClosedByEscaping = $condition;
    }
}
