@if ($configData['mainLayoutType'] === 'horizontal' && isset($configData['mainLayoutType']))
<nav class="header-navbar navbar-expand-lg navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center {{ $configData['navbarColor'] }}" data-nav="brand-center">
    <div class="navbar-header  d-xl-block d-none">
        <ul class="nav navbar-nav ">
            <li class="nav-item">
                <a class="navbar-brand" href="{{ url('/') }}">
                    <span class="brand-logo">
                        <svg viewbox="0 0 139 95" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24">
                            <defs>
                                <lineargradient id="linearGradient-1" x1="100%" y1="10.5120544%" x2="50%" y2="89.4879456%">
                                    <stop stop-color="#000000" offset="0%"></stop>
                                    <stop stop-color="#FFFFFF" offset="100%"></stop>
                                </lineargradient>
                                <lineargradient id="linearGradient-2" x1="64.0437835%" y1="46.3276743%" x2="37.373316%" y2="100%">
                                    <stop stop-color="#EEEEEE" stop-opacity="0" offset="0%"></stop>
                                    <stop stop-color="#FFFFFF" offset="100%"></stop>
                                </lineargradient>
                            </defs>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                                    <g id="Group" transform="translate(400.000000, 178.000000)">
                                        <path class="text-primary" id="Path" d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z" style="fill:currentColor"></path>
                                        <path id="Path1" d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z" fill="url(#linearGradient-1)" opacity="0.2"></path>
                                        <polygon id="Path-2" fill="#000000" opacity="0.049999997" points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"></polygon>
                                        <polygon id="Path-21" fill="#000000" opacity="0.099999994" points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"></polygon>
                                        <polygon id="Path-3" fill="url(#linearGradient-2)" opacity="0.099999994" points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"></polygon>
                                    </g>
                                </g>
                            </g>
                        </svg></span>
                    <h2 class="brand-text mb-0">Vuexy</h2>
                </a>
            </li>
        </ul>
    </div>
    @else
    <nav class="header-navbar navbar navbar-expand-lg align-items-center {{ $configData['navbarClass'] }} navbar-light navbar-shadow {{ $configData['navbarColor'] }} {{ $configData['layoutWidth'] === 'boxed' && $configData['verticalMenuNavbarType'] === 'navbar-floating'? 'container-xxl': '' }}" style=" color:#fff; border-color: #7367f0 !important; background-color: #7367f0 !important;">
        @endif
        <div class="navbar-container  d-flex content ">
            {{-- <div class="bookmark-wrapper  d-flex align-items-center "> --}}
                {{-- <ul class="nav navbar-nav d-xl-none">
                    <li class="nav-item"><a class="nav-link menu-toggle" href="javascript:void(0);"><i class="ficon" data-feather="menu"></i></a></li>
                </ul> --}}
                <div class="bookmark-wrapper d-flex align-items-center">
                    <ul class="nav navbar-nav d-xl-none">
                        <li class="nav-item"><a class="nav-link menu-toggle" href="javascript:void(0);"><i class="ficon" data-feather="menu"></i></a></li>
                    </ul>
                    <ul class="nav navbar-nav  align-items-center mx-2">
                        <li class="d-block">
                            <div class="fw-bolder"> <a class="text-white" href="{{ request()->getSchemeAndHttpHost() }}/private-clinic/patient/profile-view/{{$patient['id'] ?? ' '}}"> {{$patient['firstname'] ?? ' ' }} {{$patient['lastname'] ?? ' ' }} </a>
                                @if($gdpr->is_gdpr == 0)
                                <span class="badge rounded-pill ms-2" style="background-color:#FF9900;">GDPR Not Signed</span>                                
                                @elseif($gdpr->is_gdpr == 1)
                                <span class="badge rounded-pill ms-2" style="background-color:green;">GDPR Signed</span>                                
                                @endif
                            </div>
                            <div style="  word-spacing: 7px;">ID: {{$patient['id'] ?? ' ' }} | Ph: {{$patient['phone'] ?? ' ' }}</div>
                        </li>
                    </ul>
                </div>
            {{-- </div> --}}
            <ul class="nav navbar-nav  align-items-center ms-auto">
                <li class="nav-item dropdown dropdown-user">
                    <a class="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="javascript:void(0);" data-bs-toggle="dropdown" aria-haspopup="true">
                        <div class="user-nav d-sm-flex d-none text-white ">
                            <span class="user-name fw-bolder">
                                @if (Auth::check())
                                {{ Auth::user()->lastname }}
                                @else
                                John Doe
                                @endif
                            </span>
                            <span class="user-status">
                                {{ Auth::user()->role->name }}
                            </span>
                        </div>
                        <span class="avatar">
                            <img class="round" src="{{ Auth::user() ? Auth::user()->profile_photo_url : asset('images/portrait/small/avatar-s-11.jpg') }}" alt="avatar" height="40" width="40">
                            <span class="avatar-status-online"></span>
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
                        <h6 class="dropdown-header">Manage Profile</h6>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="{{ Auth::user() ? route('user.add-user', Auth::user()->id) : 'javascript:void(0)' }}">
                            <i class="me-50" data-feather="user"></i> Edit Profile
                        </a>
                        @if (Auth::check() && Laravel\Jetstream\Jetstream::hasApiFeatures())
                        <a class="dropdown-item" href="{{ route('api-tokens.index') }}">
                            <i class="me-50" data-feather="key"></i> API Tokens
                        </a>
                        @endif
                        <!-- <a class="dropdown-item" href="#">
          <i class="me-50" data-feather="settings"></i> Settings
        </a> -->

                        @if (Auth::User() && Laravel\Jetstream\Jetstream::hasTeamFeatures())
                        <div class="dropdown-divider"></div>
                        <h6 class="dropdown-header">Manage Team</h6>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="{{ Auth::user() ? route('teams.show', Auth::user()->currentTeam->id) : 'javascript:void(0)' }}">
                            <i class="me-50" data-feather="settings"></i> Team Settings
                        </a>
                        @can('create', Laravel\Jetstream\Jetstream::newTeamModel())
                        <a class="dropdown-item" href="{{ route('teams.create') }}">
                            <i class="me-50" data-feather="users"></i> Create New Team
                        </a>
                        @endcan

                        <div class="dropdown-divider"></div>
                        <h6 class="dropdown-header">
                            Switch Teams
                        </h6>
                        <div class="dropdown-divider"></div>
                        @if (Auth::user())
                        @foreach (Auth::user()->allTeams() as $team)
                        {{-- Below commented code read by artisan command while installing jetstream. !! Do not remove if you want to use jetstream. --}}

                        {{-- <x-jet-switchable-team :team="$team" /> --}}
                        @endforeach
                        @endif
                        @endif
                        @if (Auth::check())
                        <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="me-50" data-feather="power"></i> Logout
                        </a>
                        <form method="POST" id="logout-form" action="{{ route('logout') }}">
                            @csrf
                        </form>
                        @else
                        <a class="dropdown-item" href="{{ Route::has('login') ? route('auth-login') : 'javascript:void(0)' }}">
                            <i class="me-50" data-feather="log-in"></i> Login
                        </a>
                        @endif
                    </div>
                </li>
            </ul>
        </div>
    </nav>

    {{-- Search Start Here --}}
    <ul class="main-search-list-defaultlist d-none">
        <li class="d-flex align-items-center">
            <a href="javascript:void(0);">
                <h6 class="section-label mt-75 mb-0">Files</h6>
            </a>
        </li>
        <li class="auto-suggestion">
            <a class="d-flex align-items-center justify-content-between w-100" href="{{ url('app/file-manager') }}">
                <div class="d-flex">
                    <div class="me-75">
                        <img src="{{ asset('images/icons/xls.png') }}" alt="png" height="32">
                    </div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Two new item submitted</p>
                        <small class="text-muted">Marketing Manager</small>
                    </div>
                </div>
                <small class="search-data-size me-50 text-muted">&apos;17kb</small>
            </a>
        </li>
        <li class="auto-suggestion">
            <a class="d-flex align-items-center justify-content-between w-100" href="{{ url('app/file-manager') }}">
                <div class="d-flex">
                    <div class="me-75">
                        <img src="{{ asset('images/icons/jpg.png') }}" alt="png" height="32">
                    </div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">52 JPG file Generated</p>
                        <small class="text-muted">FontEnd Developer</small>
                    </div>
                </div>
                <small class="search-data-size me-50 text-muted">&apos;11kb</small>
            </a>
        </li>
        <li class="auto-suggestion">
            <a class="d-flex align-items-center justify-content-between w-100" href="{{ url('app/file-manager') }}">
                <div class="d-flex">
                    <div class="me-75">
                        <img src="{{ asset('images/icons/pdf.png') }}" alt="png" height="32">
                    </div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">25 PDF File Uploaded</p>
                        <small class="text-muted">Digital Marketing Manager</small>
                    </div>
                </div>
                <small class="search-data-size me-50 text-muted">&apos;150kb</small>
            </a>
        </li>
        <li class="auto-suggestion">
            <a class="d-flex align-items-center justify-content-between w-100" href="{{ url('app/file-manager') }}">
                <div class="d-flex">
                    <div class="me-75">
                        <img src="{{ asset('images/icons/doc.png') }}" alt="png" height="32">
                    </div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Anna_Strong.doc</p>
                        <small class="text-muted">Web Designer</small>
                    </div>
                </div>
                <small class="search-data-size me-50 text-muted">&apos;256kb</small>
            </a>
        </li>
        <li class="d-flex align-items-center">
            <a href="javascript:void(0);">
                <h6 class="section-label mt-75 mb-0">Members</h6>
            </a>
        </li>
        <li class="auto-suggestion">
            <a class="d-flex align-items-center justify-content-between py-50 w-100" href="{{ url('app/user/view') }}">
                <div class="d-flex align-items-center">
                    <div class="avatar me-75">
                        <img src="{{ asset('images/portrait/small/avatar-s-8.jpg') }}" alt="png" height="32">
                    </div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">John Doe</p>
                        <small class="text-muted">UI designer</small>
                    </div>
                </div>
            </a>
        </li>
        <li class="auto-suggestion">
            <a class="d-flex align-items-center justify-content-between py-50 w-100" href="{{ url('app/user/view') }}">
                <div class="d-flex align-items-center">
                    <div class="avatar me-75">
                        <img src="{{ asset('images/portrait/small/avatar-s-1.jpg') }}" alt="png" height="32">
                    </div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Michal Clark</p>
                        <small class="text-muted">FontEnd Developer</small>
                    </div>
                </div>
            </a>
        </li>
        <li class="auto-suggestion">
            <a class="d-flex align-items-center justify-content-between py-50 w-100" href="{{ url('app/user/view') }}">
                <div class="d-flex align-items-center">
                    <div class="avatar me-75">
                        <img src="{{ asset('images/portrait/small/avatar-s-14.jpg') }}" alt="png" height="32">
                    </div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Milena Gibson</p>
                        <small class="text-muted">Digital Marketing Manager</small>
                    </div>
                </div>
            </a>
        </li>
        <li class="auto-suggestion">
            <a class="d-flex align-items-center justify-content-between py-50 w-100" href="{{ url('app/user/view') }}">
                <div class="d-flex align-items-center">
                    <div class="avatar me-75">
                        <img src="{{ asset('images/portrait/small/avatar-s-6.jpg') }}" alt="png" height="32">
                    </div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Anna Strong</p>
                        <small class="text-muted">Web Designer</small>
                    </div>
                </div>
            </a>
        </li>
    </ul>

    {{-- if main search not found! --}}
    <ul class="main-search-list-defaultlist-other-list d-none">
        <li class="auto-suggestion justify-content-between">
            <a class="d-flex align-items-center justify-content-between w-100 py-50">
                <div class="d-flex justify-content-start">
                    <span class="me-75" data-feather="alert-circle"></span>
                    <span>No results found.</span>
                </div>
            </a>
        </li>
    </ul>
    {{-- Search Ends --}}
</nav>