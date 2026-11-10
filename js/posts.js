/**
 * CampusConnect - Posts & Community Feed Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('createPostForm');
  const postContentInput = document.getElementById('postContentInput');
  const charCounter = document.getElementById('charCounter');
  const imageInput = document.getElementById('postImageUrl');
  const previewBox = document.getElementById('imagePreviewBox');

  // Character counter
  if (postContentInput && charCounter) {
    postContentInput.addEventListener('input', () => {
      const len = postContentInput.value.length;
      charCounter.textContent = `${len} / 500 characters`;
    });
  }

  // Image Preview
  if (imageInput && previewBox) {
    imageInput.addEventListener('input', () => {
      const url = imageInput.value.trim();
      if (url) {
        previewBox.innerHTML = `<img src="${url}" alt="Preview" style="max-height:220px;border-radius:var(--radius-md);margin-top:0.75rem;object-fit:cover;width:100%;" onerror="this.remove()">`;
      } else {
        previewBox.innerHTML = '';
      }
    });
  }

  // Submit Handler
  if (postForm) {
    postForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const content = postContentInput.value.trim();
      const category = document.getElementById('postCategory').value;
      const imageUrl = imageInput ? imageInput.value.trim() : '';
      const submitBtn = document.getElementById('submitPostBtn');

      if (!content) {
        showToast("Please enter some text for your post.", "warning");
        return;
      }

      const user = CampusData.getCurrentUser();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Publishing...";
      }

      const newPost = {
        userId: user.uid,
        userName: user.name,
        userBranch: `${user.course || 'B.Tech'}, ${user.branch || 'Student'}`,
        userAvatar: user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        content: content,
        category: category,
        image: imageUrl || null,
        timestamp: "Just now",
        likes: 0,
        isLiked: false,
        comments: []
      };

      try {
        await CampusData.addPost(newPost);
        showToast("Post published successfully! 🎉", "success");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 600);
      } catch (err) {
        console.error(err);
        showToast("Error creating post. Please try again.", "danger");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Publish Post";
        }
      }
    });
  }
});
