<template>
  <div class="container">
    <div class="row">
      <div class="col">
          <div>
              <h3>Chose a photo</h3>
            <button class="button button--upload-btn">choose photo</button>
            <input type="file" ref="input1"
            style="display:none"
            @change="preivewImage" accept="image/*" >
          </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <br />
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="caption goes here"
          aria-label="upload photo"
          v-model="caption"
        />
        <br/>
        <button type="button" class="btn btn-primary" @click="create">upload</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        create() {
            console.log(this.caption)
        }
    }
}
</script>

<style></style>
