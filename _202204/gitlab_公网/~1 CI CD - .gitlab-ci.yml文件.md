[TOC]

# The `.gitlab-ci.yml` file 

要使用 GitLab CI/CD，您需要：

- 托管在 Git 存储库中的应用程序代码。
- 存储库根目录中名为 [`.gitlab-ci.yml`](https://docs.gitlab.com/ee/ci/yaml/index.html) 的文件，其中包含 CI/CD 配置。

在`.gitlab-ci.yml`文件中，您可以定义：

- 要运行的脚本。
- 要包含的其他配置文件和模板。
- 依赖项和缓存。
- 要按顺序运行的命令和要并行运行的命令。
- 要将应用程序部署到的位置。
- 是要自动运行脚本还是手动触发任何脚本。

这些脚本被分组到**作业**中，作业作为较大**管道**的一部分运行。

您可以将多个独立作业分组到按定义的顺序运行的**阶段**中。

CI/CD 配置至少需要一个[未隐藏的](https://docs.gitlab.com/ee/ci/jobs/index.html#hide-jobs)作业。

您应按照适合您的应用程序并符合您要执行的测试的顺序来组织作业。

要[可视化](https://docs.gitlab.com/ee/ci/pipeline_editor/index.html#visualize-ci-configuration)该过程，请假设您添加到作业的脚本与您在计算机上运行的 CLI 命令相同。

当您将`.gitlab-ci.yml`文件添加到存储库时，GitLab 会检测到该文件，名为 [GitLab Runner](https://docs.gitlab.com/runner/) 的应用程序将运行作业中定义的脚本。



文件`.gitlab-ci.yml`可能包含：

```yaml
stages: 		#define what stages to run?
  - build
  - test

build-code-job: #jobName
  stage: build	#stage
  script:
    - echo "Check the ruby version, then build some Ruby project files:"
    - ruby -v
    - rake

test-code-job1:
  stage: test
  script:
    - echo "If the files are built successfully, test some files with one command:"
    - rake test1

test-code-job2:
  stage: test
  script:
    - echo "If the files are built successfully, test other files with a different command:"
    - rake test2
```

在此示例中，`build`阶段中的作业首先运行`build-code-job`。

它输出作业正在使用的 Ruby 版本，然后运行`rake`以生成项目文件。

如果此作业成功完成，则`test`阶段中的两个作业`test-code-job`将并行启动并对文件运行测试。

示例中的完整管道由三个作业组成，分为两个阶段`build`和`test` 。

**每次将更改推送到项目中的任何分支时，管道都会运行**。

GitLab CI/CD 不仅执行作业，还向您显示执行期间发生的情况，就像您在终端中看到的那样：



你为应用创建策略，GitLab 根据你定义的内容运行管道。您的管道状态也会由 GitLab 显示：



如果出现任何问题，您可以[回滚](https://docs.gitlab.com/ee/ci/environments/index.html#retry-or-roll-back-a-deployment)更改：



# Keyword reference for the `.gitlab-ci.yml` file

GitLab `.gitlab-ci.yml`文件的配置选项

[Keyword reference for the `.gitlab-ci.yml` file | GitLab](https://docs.gitlab.com/ee/ci/yaml/)