/* ==================================================
   Gallery Store - Pinia
   ================================================== */

import { defineStore } from 'pinia';
import type {
    GalleryImage,
    GalleryState,
    GalleryFilters,
    ModalState
} from '@/types/gallery.types';
import { MOCK_IMAGES } from '@/services/mockData';

export const useGalleryStore = defineStore('gallery', {
    state: (): GalleryState & { modal: ModalState; prefersReducedMotion: boolean } => ({
        // Gallery data
        images: [],
        selectedImage: null,
        isLoading: false,
        isLoadingMore: false,
        error: null,
        page: 1,
        hasMore: true,
        searchQuery: '',
        activeCategory: null,

        // Modal state
        modal: {
            isOpen: false,
            imageId: null,
            initialRect: null,
        },

        // Motion preferences
        prefersReducedMotion: false,
    }),

    getters: {
        /**
         * Get image by ID
         */
        getImageById: (state) => {
            return (id: string): GalleryImage | undefined => {
                return state.images.find(img => img.id === id);
            };
        },

        /**
         * Get selected image details
         */
        currentImage: (state): GalleryImage | null => {
            if (!state.modal.imageId) return null;
            return state.images.find(img => img.id === state.modal.imageId) || null;
        },

        /**
         * Check if gallery is empty
         */
        isEmpty: (state): boolean => {
            return !state.isLoading && state.images.length === 0;
        },

        /**
         * Get images count
         */
        totalImages: (state): number => {
            return state.images.length;
        },

        /**
         * Filter images by category
         */
        filteredImages: (state): GalleryImage[] => {
            if (!state.activeCategory) return state.images;
            return state.images.filter(img =>
                img.tags?.includes(state.activeCategory!)
            );
        },
    },

    actions: {
        /**
         * Set images array
         */
        setImages(images: GalleryImage[]) {
            this.images = images;
        },

        /**
         * Append images (for infinite scroll)
         */
        appendImages(images: GalleryImage[]) {
            this.images = [...this.images, ...images];
        },

        /**
         * Set loading state
         */
        setLoading(isLoading: boolean) {
            this.isLoading = isLoading;
        },

        /**
         * Set loading more state
         */
        setLoadingMore(isLoading: boolean) {
            this.isLoadingMore = isLoading;
        },

        /**
         * Set error
         */
        setError(error: string | null) {
            this.error = error;
        },

        /**
         * Set pagination info
         */
        setPagination(page: number, hasMore: boolean) {
            this.page = page;
            this.hasMore = hasMore;
        },

        /**
         * Open modal with image
         */
        openModal(imageId: string, initialRect?: DOMRect) {
            this.modal.isOpen = true;
            this.modal.imageId = imageId;
            this.modal.initialRect = initialRect || null;
            this.selectedImage = this.getImageById(imageId) || null;

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        },

        /**
         * Close modal
         */
        closeModal() {
            this.modal.isOpen = false;
            this.modal.imageId = null;
            this.modal.initialRect = null;
            this.selectedImage = null;

            // Restore body scroll
            document.body.style.overflow = '';
        },

        /**
         * Navigate to next image in modal
         */
        nextImage() {
            if (!this.modal.imageId) return;
            const currentIndex = this.images.findIndex(img => img.id === this.modal.imageId);
            if (currentIndex < this.images.length - 1) {
                const nextImage = this.images[currentIndex + 1];
                this.modal.imageId = nextImage.id;
                this.selectedImage = nextImage;
            }
        },

        /**
         * Navigate to previous image in modal
         */
        prevImage() {
            if (!this.modal.imageId) return;
            const currentIndex = this.images.findIndex(img => img.id === this.modal.imageId);
            if (currentIndex > 0) {
                const prevImage = this.images[currentIndex - 1];
                this.modal.imageId = prevImage.id;
                this.selectedImage = prevImage;
            }
        },

        /**
         * Set reduced motion preference
         */
        setReducedMotion(prefersReduced: boolean) {
            this.prefersReducedMotion = prefersReduced;
        },

        /**
         * Set search query
         */
        setSearchQuery(query: string) {
            this.searchQuery = query;
        },

        /**
         * Set active category
         */
        setActiveCategory(category: string | null) {
            this.activeCategory = category;
        },

        /**
         * Reset gallery state
         */
        reset() {
            this.images = [];
            this.selectedImage = null;
            this.isLoading = false;
            this.error = null;
            this.page = 1;
            this.hasMore = true;
            this.searchQuery = '';
            this.activeCategory = null;
            this.closeModal();
        },

        /**
         * Fetch initial images (Mock)
         */
        async fetchImages() {
            this.isLoading = true;
            this.error = null;

            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                this.setImages(MOCK_IMAGES);
            } catch (err) {
                this.setError('Failed to load images');
            } finally {
                this.isLoading = false;
            }
        },
    },
});
