<template>
    <div class="not-container">
    <h1 class="notfound">page not found!</h1>
    <p>
        <RouterLink to="/dashboard">to dashboard</RouterLink>
    </p>
</div>
</template>

<style scoped>
.not-container{
    width: 100%;
}
.notfound{
    text-align: center;
    font-size: 3rem;
    padding: 2rem;
    color: white;
}
a{
    color: azure;
    text-align: right;
}
</style>