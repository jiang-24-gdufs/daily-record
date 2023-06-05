[TOC]

# CI/CD pipelines

管道是持续集成、交付和部署的顶级组件。

管道包括：

- Jobs: 作业，定义要执行*的*操作。例如，编译或测试代码的作业。
- Stages: 阶段，定义*何时*运行作业。例如，在编译代码的阶段之后运行测试的阶段。

作业由 runners 执行。如果有足够的多个 runner，则并行执行同一阶段中的多个作业。

如果某个阶段中的所有作业都成功，则管道将**进入下一阶段**。

如果某个阶段中的任何作业失败，则不会（通常）执行下一阶段，并且管道会提前结束。

通常，管道是自动执行的，一旦创建就不需要干预。但是，有时也可以手动与管道交互。

**典型的管道可能由四个阶段**组成，按以下顺序执行：

- A **`build`** stage, with a job called `compile`.
- A **`test`** stage, with two jobs called `test1` and `test2`.
- A **`staging`** stage, with a job called `deploy-to-stage`.
- A **`production`** stage, with a job called `deploy-to-prod`



## 管道类型

可以通过多种不同的方式配置管道：

- [基本管道](https://docs.gitlab.com/ee/ci/pipelines/pipeline_architectures.html#basic-pipelines)同时运行每个阶段中的所有内容，然后是下一阶段。
- [有向无环图管道 （DAG） 管道](https://docs.gitlab.com/ee/ci/directed_acyclic_graph/index.html)基于作业之间的关系，可以比基本管道更快地运行。
- [合并请求管道](https://docs.gitlab.com/ee/ci/pipelines/merge_request_pipelines.html)仅针对合并请求运行（而不是针对每个提交）。
- [合并的结果管道](https://docs.gitlab.com/ee/ci/pipelines/merged_results_pipelines.html)是合并请求管道，其作用就好像源分支中的更改已合并到目标分支中一样。
- [合并训练](https://docs.gitlab.com/ee/ci/pipelines/merge_trains.html)使用合并的结果管道逐个对合并进行排队。
- [父子管道](https://docs.gitlab.com/ee/ci/pipelines/parent_child_pipelines.html)将复杂的管道分解为一个父管道，该父管道可以触发多个子管道，这些子子管道都在同一项目中运行，并且具有相同的 SHA。此管道体系结构通常用于单存储库。
- [多项目管道将](https://docs.gitlab.com/ee/ci/pipelines/multi_project_pipelines.html)不同项目的管道组合在一起。



### 父子管道与多项目管道的比较情况

todo... 



## 配置管道

todo...





