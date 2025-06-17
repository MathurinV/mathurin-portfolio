<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let backgroundRef = $state<HTMLDivElement>();
	let particles = $state<HTMLDivElement[]>([]);
	let isAnimating = $state(false);

	// Configuration
	const particleCount = 50;
	const skeletonColors = [
		'bg-primary-700 dark:bg-primary-50',
		'bg-secondary-700 dark:bg-secondary-50',
		'bg-tertiary-700 dark:bg-tertiary-50',
		'bg-success-700 dark:bg-success-50',
		'bg-warning-700 dark:bg-warning-50',
		'bg-error-700 dark:bg-error-50'
	]; // SkeletonUI color classes

	onMount(() => {
		if (!backgroundRef) return;

		// Create particles
		createParticles();

		// Start animation
		startAnimation();

		// Handle resize
		const handleResize = () => {
			if (isAnimating) {
				stopAnimation();
				createParticles();
				startAnimation();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			stopAnimation();
		};
	});

	function createParticles() {
		if (!backgroundRef) return;

		// Clear existing particles
		backgroundRef.innerHTML = '';
		particles = [];

		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement('div');
			particle.className = 'particle absolute rounded-full';

			// Random size between 2-8px
			const size = Math.random() * 30 + 10;
			particle.style.width = `${size}px`;
			particle.style.height = `${size}px`;

			// Random color from SkeletonUI palette using Tailwind classes
			const colorClass = skeletonColors[Math.floor(Math.random() * skeletonColors.length)];
			particle.className = `particle absolute rounded-full opacity-60 ${colorClass}`;

			// Random starting position
			particle.style.left = `${Math.random() * 100}%`;
			particle.style.top = `${Math.random() * 100}%`;

			backgroundRef.appendChild(particle);
			particles.push(particle);
		}
	}

	function startAnimation() {
		if (!backgroundRef || particles.length === 0) return;

		isAnimating = true;

		particles.forEach((particle, index) => {
			// Create floating animation
			gsap.to(particle, {
				x: `+=${Math.random() * 400 - 200}`,
				y: `+=${Math.random() * 400 - 200}`,
				duration: Math.random() * 10 + 15,
				repeat: -1,
				yoyo: true,
				ease: 'power1.inOut',
				delay: Math.random() * 2
			});

			// Create pulsing animation
			gsap.to(particle, {
				scale: Math.random() * 0.5 + 0.8,
				duration: Math.random() * 3 + 2,
				repeat: -1,
				yoyo: true,
				ease: 'power2.inOut',
				delay: Math.random() * 1
			});

			// Create opacity animation
			gsap.to(particle, {
				opacity: Math.random() * 0.4 + 0.3,
				duration: Math.random() * 4 + 3,
				repeat: -1,
				yoyo: true,
				ease: 'power2.inOut',
				delay: Math.random() * 2
			});
		});

		// Add subtle background gradient animation (keeping original since Tailwind classes work better for particles)
		gsap.to(backgroundRef, {
			background:
				'linear-gradient(45deg, rgba(var(--color-primary-500), 0.05), rgba(var(--color-secondary-500), 0.05), rgba(var(--color-tertiary-500), 0.05))',
			duration: 8,
			repeat: -1,
			yoyo: true,
			ease: 'power1.inOut'
		});
	}

	function stopAnimation() {
		isAnimating = false;
		gsap.killTweensOf(particles);
		if (backgroundRef) {
			gsap.killTweensOf(backgroundRef);
		}
	}
</script>

<div bind:this={backgroundRef} class="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
	<!-- Particles will be dynamically created here -->
</div>

<style>
	.particle {
		will-change: transform, opacity, scale;
		pointer-events: none;
	}
</style>
