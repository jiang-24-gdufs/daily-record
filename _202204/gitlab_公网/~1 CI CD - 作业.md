[toc]

# Jobs

管道配置从作业开始。作业是文件`.gitlab-ci.yml`的最基本元素。

职位包括：

- 使用约束进行定义，说明应在什么条件下执行它们。
- 具有任意名称且必须至少包含[`script`](https://docs.gitlab.com/ee/ci/yaml/index.html#script)子句的顶级元素。
- 不限于可以定义的数量。

例如：

```yaml
job1:
  script: "execute-script-for-job1"

job2:
  script: "execute-script-for-job2"
```

上面的示例是具有两个单独作业的最简单的 CI/CD 配置，其中每个作业执行不同的命令。当然，命令可以直接执行代码 （`./configure;make;make install`） 或在存储库中运行脚本 （`test.sh`）。

作业由[ runner ](https://docs.gitlab.com/ee/ci/runners/index.html)拾取并在 runner 的环境中执行。重要的是，**每个作业都是彼此独立运行的**。

## 查看管道中的作业

### 查看项目中的所有作业

## 了解作业失败的原因

## 管道中作业的顺序

## 作业名称限制

## 对管道中的作业进行分组

## 隐藏作业

more todo...