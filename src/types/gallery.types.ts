/* ==================================================
   Gallery Types
   ================================================== */

export interface GalleryImage {
    id: string;
    url: string;
    thumbnailUrl: string;
    blurHash?: string;
    width: number;
    height: number;
    alt: string;
    description?: string;
    author: ImageAuthor;
    downloadUrl?: string;
    tags?: string[];
    color?: string;
    createdAt?: string;
}

export interface ImageAuthor {
    id: string;
    name: string;
    username: string;
    profileUrl?: string;
    avatarUrl?: string;
}

export interface GalleryState {
    images: GalleryImage[];
    selectedImage: GalleryImage | null;
    isLoading: boolean;
    isLoadingMore: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    searchQuery: string;
    activeCategory: string | null;
}

export interface GalleryFilters {
    category?: string;
    query?: string;
    orderBy?: 'latest' | 'oldest' | 'popular';
    orientation?: 'landscape' | 'portrait' | 'squarish';
    color?: string;
}

export interface PaginationOptions {
    page: number;
    perPage: number;
}

export interface ApiResponse<T> {
    data: T;
    total: number;
    totalPages: number;
}

/* ==================================================
   UI State Types
   ================================================== */

export interface ModalState {
    isOpen: boolean;
    imageId: string | null;
    clickPosition: { x: number; y: number } | null;
}

export interface ScrollState {
    progress: number;
    direction: 'up' | 'down';
    isScrolling: boolean;
    currentSection: number;
}

export interface ViewportSize {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

/* ==================================================
   Animation Presets
   ================================================== */

export interface CardAnimationState {
    rotateX: number;
    rotateY: number;
    scale: number;
    translateZ: number;
    isHovered: boolean;
}

export interface SectionAnimationState {
    isVisible: boolean;
    progress: number;
    isPinned: boolean;
}
