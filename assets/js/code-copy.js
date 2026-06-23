(function () {
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function enhanceCodeBlocks() {
    document.querySelectorAll("pre > code").forEach(function (code) {
      var pre = code.parentElement;

      if (!pre || pre.parentElement.classList.contains("code-block")) {
        return;
      }

      var wrapper = document.createElement("div");
      wrapper.className = "code-block";

      var button = document.createElement("button");
      button.className = "code-copy";
      button.type = "button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code");

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);

      button.addEventListener("click", function () {
        copyText(code.textContent).then(function () {
          button.textContent = "Copied";
          button.classList.add("copied");

          window.setTimeout(function () {
            button.textContent = "Copy";
            button.classList.remove("copied");
          }, 1600);
        }).catch(function () {
          button.textContent = "Failed";

          window.setTimeout(function () {
            button.textContent = "Copy";
          }, 1600);
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceCodeBlocks);
  } else {
    enhanceCodeBlocks();
  }
})();
