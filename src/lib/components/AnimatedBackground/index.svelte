<script lang="ts">
	// No JavaScript needed - pure CSS animations
</script>

<div
	class="pointer-events-none fixed top-0 left-0 -z-10 h-dvh w-full overflow-hidden"
	aria-hidden="true"
>
	<!-- Large floating dots -->
	<div
		class="animate-float-slow bg-primary-500 absolute h-32 w-32 rounded-full opacity-20"
		style="top: 10%; left: 15%; animation-delay: 0s;"
	></div>
	<div
		class="animate-float-medium bg-secondary-500 absolute h-24 w-24 rounded-full blur-xs"
		style="top: 60%; left: 70%; animation-delay: -2s;"
	></div>
	<div
		class="animate-float-fast bg-tertiary-500 absolute h-20 w-20 rounded-full opacity-40"
		style="top: 30%; left: 80%; animation-delay: -1s;"
	></div>

	<!-- Medium floating dots -->
	<div
		class="animate-pulse-slow bg-secondary-500 absolute h-16 w-16 rounded-full opacity-20"
		style="top: 80%; left: 20%; animation-delay: -3s;"
	></div>
	<div
		class="animate-float-medium bg-tertiary-500 absolute h-12 w-12 rounded-full blur-xs"
		style="top: 20%; left: 60%; animation-delay: -1.5s;"
	></div>
	<div
		class="animate-float-slow bg-success-500 absolute h-18 w-18 rounded-full opacity-25"
		style="top: 70%; left: 45%; animation-delay: -4s;"
	></div>

	<!-- Small floating dots -->
	<div
		class="animate-float-fast bg-tertiary-500 absolute h-8 w-8 rounded-full opacity-40"
		style="top: 45%; left: 25%; animation-delay: -2.5s;"
	></div>
	<div
		class="animate-pulse-medium bg-success-500 absolute h-6 w-6 rounded-full opacity-45"
		style="top: 15%; left: 85%; animation-delay: -1.8s;"
	></div>
	<div
		class="animate-float-medium bg-warning-500 absolute h-10 w-10 rounded-full opacity-30 blur-sm"
		style="top: 85%; left: 75%; animation-delay: -3.2s;"
	></div>
	<div
		class="animate-float-slow bg-error-500 absolute h-14 w-14 rounded-full opacity-25"
		style="top: 55%; left: 10%; animation-delay: -0.8s;"
	></div>

	<!-- Tiny accent dots -->
	<div
		class="animate-pulse-fast bg-warning-500 absolute h-4 w-4 rounded-full opacity-50"
		style="top: 25%; left: 40%; animation-delay: -1.2s;"
	></div>
	<div
		class="animate-float-fast bg-error-500 absolute h-3 w-3 rounded-full opacity-60"
		style="top: 65%; left: 90%; animation-delay: -2.8s;"
	></div>
	<div
		class="animate-pulse-slow bg-surface-500 absolute h-5 w-5 rounded-full opacity-40"
		style="top: 90%; left: 55%; animation-delay: -4.5s;"
	></div>
</div>

<style>
	@keyframes float-slow {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		25% {
			transform: translate3d(10px, -20px, 0) scale(1.1);
		}
		50% {
			transform: translate3d(-15px, -10px, 0) scale(0.9);
		}
		75% {
			transform: translate3d(5px, -25px, 0) scale(1.05);
		}
	}

	@keyframes float-medium {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		33% {
			transform: translate3d(-12px, -15px, 0) scale(1.15);
		}
		66% {
			transform: translate3d(18px, -8px, 0) scale(0.85);
		}
	}

	@keyframes float-fast {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		20% {
			transform: translate3d(8px, -12px, 0) scale(1.2);
		}
		40% {
			transform: translate3d(-10px, -6px, 0) scale(0.8);
		}
		60% {
			transform: translate3d(15px, -18px, 0) scale(1.1);
		}
		80% {
			transform: translate3d(-5px, -3px, 0) scale(0.9);
		}
	}

	@keyframes pulse-slow {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.2;
		}
		50% {
			transform: scale(1.3);
			opacity: 0.4;
		}
	}

	@keyframes pulse-medium {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.4);
			opacity: 0.6;
		}
	}

	@keyframes pulse-fast {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.4;
		}
		50% {
			transform: scale(1.5);
			opacity: 0.7;
		}
	}

	.animate-float-slow {
		animation: float-slow 12s ease-in-out infinite;
		will-change: transform;
	}

	.animate-float-medium {
		animation: float-medium 8s ease-in-out infinite;
		will-change: transform;
	}

	.animate-float-fast {
		animation: float-fast 6s ease-in-out infinite;
		will-change: transform;
	}

	.animate-pulse-slow {
		animation: pulse-slow 4s ease-in-out infinite;
		will-change: transform, opacity;
	}

	.animate-pulse-medium {
		animation: pulse-medium 3s ease-in-out infinite;
		will-change: transform, opacity;
	}

	.animate-pulse-fast {
		animation: pulse-fast 2s ease-in-out infinite;
		will-change: transform, opacity;
	}
</style>
