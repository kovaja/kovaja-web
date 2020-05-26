<template>
  <ContentCard class="justify-content-center">
    <div class="col-12 col-md-8 p-5">
      <p class="text-justify">
        One would expect some well thought introduction, but none would actually
        read it. So simply: I live in Prague, but I grew up in Brno. My
        collegues and friends from Prague make fun of it and I am fine with
        that. I write code for a living, mostly javascript.
      </p>

      <p class="text-justify">
        I like Node.js and I tend to experiment with it at home. From time
        to time I touch some other programming language. I like Typescript and I
        am not afraid to say it 🙂. And I don't really like CSS, but that's
        because I suck at it. This site might be my master piece (thanks
        Bootstrap 😅).
      </p>

      <p class="text-justify">
        I started this project during my sabatical to learn Vue. Yes it is a
        single page app 🤷‍♂️. Then I stopped and moved to some other personal
        project, because that's what I apparently do and then I came back,
        because I couldn't leave the domain untouched for 2 years!
      </p>

      <p class="text-justify">
        So thanks for stopping by, I appreciate that 🙂.
      </p>
    </div>
  </ContentCard>
</template>

<script lang="ts">
import Vue from "vue";
import ContentCard from "@/components/common/ContentCard.vue";

export default Vue.extend({
  name: "AboutMe",
  components: {
    ContentCard
  }
});
</script>
