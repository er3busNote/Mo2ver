package com.mo2ver.batch.task.listener;

import com.mo2ver.batch.domain.goods.repository.GoodsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.listener.StepExecutionListenerSupport;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TotalCountStepListener extends StepExecutionListenerSupport {

    private static final Integer TOTAL_SIZE = 44446;
    private static final String TARGET_STEP_NAME = "keywordStep";

    private final GoodsRepository goodsRepository;

    @Override
    public void beforeStep(StepExecution stepExecution) {
        String currentStepName = stepExecution.getStepName();

        long totalCount = TOTAL_SIZE.longValue();
        if (TARGET_STEP_NAME.equals(currentStepName)) {
            totalCount = Optional.of(goodsRepository.countByKeywordIsNull())
                    .filter(count -> count > 0)
                    .orElse(TOTAL_SIZE.longValue());
        }
        stepExecution.getExecutionContext().putInt("totalItemCount", (int) totalCount);
    }
}
