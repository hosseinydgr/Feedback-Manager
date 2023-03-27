let observer = new IntersectionObserver(function (entries, self) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      preloadIssue(entry.target);
      self.unobserve(entry.target);
    }
  });
});

function preloadIssue(issueDiv: any) {
  issueDiv.style.opacity = "1";
  // console.log(issueDiv.id);
}

export { observer };
