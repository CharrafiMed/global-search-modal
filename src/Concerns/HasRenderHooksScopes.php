<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

trait HasRenderHooksScopes

{
    public  string | array | null $scopes = null;


    public  function scopes(string | array | null $scopes): self
    {
        $this->scopes = $scopes;
        return $this;
    }

    public  function getRenderHooksScopes(): string | array | null
    {
        return $this->scopes;
    }
}
