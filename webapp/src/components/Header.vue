<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">RetroPie Manager</b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />
            <rmw-navigation-links />
        </b-navbar>
    </div>
</template>

<script>
import RmwNavigationLinks from '@/components/NavigationLinks.vue';

export default {
    name: 'RmwHeader',
    components: {
        RmwNavigationLinks
    }
};
</script>
