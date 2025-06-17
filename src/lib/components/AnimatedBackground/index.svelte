<script lang="ts">
	// No JavaScript needed - pure CSS animations
</script>

<div class="pointer-events-none fixed top-0 left-0 -z-10 h-dvh w-full overflow-hidden">
	<!-- Large floating dots -->
	<div
		class="animate-float-slow absolute h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-20 blur-sm"
		style="top: 10%; left: 15%; animation-delay: 0s;"
	></div>
	<div
		class="animate-float-medium absolute h-24 w-24 rounded-full bg-gradient-to-br from-pink-400 to-red-500 opacity-25 blur-sm"
		style="top: 60%; left: 70%; animation-delay: -2s;"
	></div>
	<div
		class="animate-float-fast absolute h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500 opacity-30"
		style="top: 30%; left: 80%; animation-delay: -1s;"
	></div>

	<!-- Medium floating dots -->
	<div
		class="animate-pulse-slow absolute h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20"
		style="top: 80%; left: 20%; animation-delay: -3s;"
	></div>
	<div
		class="animate-float-medium absolute h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-blue-600 opacity-35 blur-sm"
		style="top: 20%; left: 60%; animation-delay: -1.5s;"
	></div>
	<div
		class="animate-float-slow absolute h-18 w-18 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 opacity-25"
		style="top: 70%; left: 45%; animation-delay: -4s;"
	></div>

	<!-- Small floating dots -->
	<div
		class="animate-float-fast absolute h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 opacity-40"
		style="top: 45%; left: 25%; animation-delay: -2.5s;"
	></div>
	<div
		class="animate-pulse-medium absolute h-6 w-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 opacity-45"
		style="top: 15%; left: 85%; animation-delay: -1.8s;"
	></div>
	<div
		class="animate-float-medium absolute h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-30 blur-sm"
		style="top: 85%; left: 75%; animation-delay: -3.2s;"
	></div>
	<div
		class="animate-float-slow absolute h-14 w-14 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 opacity-25"
		style="top: 55%; left: 10%; animation-delay: -0.8s;"
	></div>

	<!-- Tiny accent dots -->
	<div
		class="animate-pulse-fast absolute h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 opacity-50"
		style="top: 25%; left: 40%; animation-delay: -1.2s;"
	></div>
	<div
		class="animate-float-fast absolute h-3 w-3 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 opacity-60"
		style="top: 65%; left: 90%; animation-delay: -2.8s;"
	></div>
	<div
		class="animate-pulse-slow absolute h-5 w-5 rounded-full bg-gradient-to-br from-lime-400 to-green-500 opacity-40"
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
