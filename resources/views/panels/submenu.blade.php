{{-- For submenu --}}
<ul class="menu-content">
  @if (isset($menu))
    @foreach ($menu as $submenu)
      @php
        $allowedRequestIndentUser = array(14885, 14883);
        $hasPermission =  (isset($submenu->permission) && in_array($submenu->permission, $permissionArray));
      @endphp
      @if($hasPermission)
        <li @if ($submenu->slug === Route::currentRouteName()) class="active" @endif>
          <a href="{{ isset($submenu->url) ? url($submenu->url) : 'javascript:void(0)' }}" class="d-flex align-items-center"
            target="{{ isset($submenu->newTab) && $submenu->newTab === true ? '_blank' : '_self' }}">
            @if (isset($submenu->icon))
              <i data-feather="{{ $submenu->icon }}"></i>
            @endif
            <span class="menu-item text-truncate">{{ __('locale.' . $submenu->name) }}</span>
          </a>
          @if (isset($submenu->submenu))
            @include('panels/submenu', ['menu' => $submenu->submenu])
          @endif
        </li>
      @else
        @if (auth()->check() && in_array(auth()->user()->id, $allowedRequestIndentUser))
          @if ($submenu->permission == 'request-indent_read')
            <li @if ($submenu->slug === Route::currentRouteName()) class="active" @endif>
              <a href="{{ isset($submenu->url) ? url($submenu->url) : 'javascript:void(0)' }}" class="d-flex align-items-center"
                target="{{ isset($submenu->newTab) && $submenu->newTab === true ? '_blank' : '_self' }}">
                @if (isset($submenu->icon))
                  <i data-feather="{{ $submenu->icon }}"></i>
                @endif
                <span class="menu-item text-truncate">{{ __('locale.' . $submenu->name) }}</span>
              </a>
              @if (isset($submenu->submenu))
                @include('panels/submenu', ['menu' => $submenu->submenu])
              @endif
            </li>
          @endif
        @endif
      @endif
    @endforeach
  @endif
</ul>
