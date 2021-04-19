<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Manage Your Blog Entries</h1>

      <FeathersVuexFind service="blog-entry" :query="{}" watch="query">
        <section slot-scope="{ items: blogEntries }">
          <q-table :data="blogEntries" :columns="columns">
            <template v-slot:body-cell-title="props">
              <q-td :props="props">
                {{ props.row.title }}
              </q-td>
            </template>
            <template v-slot:body-cell-text="props">
              <q-td :props="props">
                {{ props.row.text }}
              </q-td>
            </template>
            <template v-slot:body-cell-images="props">
              <q-td :props="props">
                {{ props.row.images.length }}
              </q-td>
            </template>
            <template v-slot:body-cell-attachment="props">
              <q-td :props="props">
                {{ props.row.attachment ? 'yes' : 'no' }}
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  size="sm"
                  dense
                  class="q-pa-xs q-mx-xs"
                  color="primary"
                  title="Edit Blog"
                  @click="editBlogEntry(props.row)"
                  >Edit Blog
                </q-btn>
                <q-btn
                  size="sm"
                  dense
                  class="q-pa-xs q-mx-xs"
                  color="primary"
                  title="delete"
                  @click="deleteBlogEntry(props.row)"
                  >delete
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </section>
      </FeathersVuexFind>

      <q-btn color="primary"  @click="addNewBlogEntry">Create new Entry</q-btn>

      <blog-entry-form v-if="currentBlogEntry" v-model="currentBlogEntry" @change="blogEntryChanged" />
    </div>
  </section>
</template>

<script>
  import BlogEntryForm from "../../components/blog/BlogEntryForm";
  import {FeathersVuexFind} from 'feathers-vuex';

  export default {
  components: {
    BlogEntryForm, 
    FeathersVuexFind},
  data: () => ({
    currentBlogEntry: undefined, // current entry in form
    columns: [
        {
          name: "title",
          required: true,
          label: "title"
        },
        {
          name: "text",
          label: "text"
        },
        {
          name: "images",
          label: "images"
        },
        {
          name: "attachment",
          label: "attachment"
        },
        {
          name: "action",
          align: "center",
          label: "Action"
        }
    ]
  }),
  watch: {
    currentBlogEntry: function (data) {
      console.log(data)
    }
  },
  methods: {
    /**
     * create new blog entry instance
     */
    addNewBlogEntry () {
      const { BlogEntry } = this.$FeathersVuex.api;
      this.currentBlogEntry = new BlogEntry();
    },
    /**
     * called, when blog entry changes
     */
    blogEntryChanged () {
      // close form
      this.currentBlogEntry = undefined;
      // this.$buefy.toast.open('Entry saved.');
    },
    editBlogEntry (blogEntry) {
      this.currentBlogEntry = blogEntry;
      console.log('this.currentBlogEntry',this.currentBlogEntry)
    },
    deleteBlogEntry (blogEntry) {
      this.$buefy.dialog.confirm({
        message: 'Really delete ' + blogEntry.title,
        onConfirm: async () => {
          try {
            await blogEntry.remove();
            // this.$buefy.toast.open('Entry deleted.');
          } catch (e) {
            // this.$buefy.toast.open({ message: 'Deletion failed: ' + e, type: 'is-danger', duration: 5000 });
          }
        }
      });
    }
  }
};
</script>
